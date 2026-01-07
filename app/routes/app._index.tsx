import { useState, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useFetcher, useNavigate, useLoaderData } from "react-router";
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Banner,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { createClient } from "@supabase/supabase-js";
import { authenticate } from "../shopify.server";
import { supabase as supabaseClient } from "../supabase.client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop, connection: null, session };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const actionType = formData.get("actionType");
  const supabaseAccessToken = formData.get("supabaseAccessToken") as string;

  if (actionType === "disconnect") {
     return { success: true, disconnected: true };
  }

  if (actionType === "connect") {
    if (!supabaseAccessToken) {
        return { success: false, error: "Missing Supabase token" };
    }

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;
    
    const userSupabase = createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
            },
        },
    });

    const { data: { user }, error: userError } = await userSupabase.auth.getUser();

    if (userError || !user) {
        return { success: false, error: "Invalid Supabase token" };
    }

    const { data: subscription, error: subError } = await userSupabase
        .from("subscriptions")
        .select("*, subscription_plans(*)")
        .eq("user_id", user.id)
        .in("status", ["active", "trialing"])
        .maybeSingle();

    if (subError || !subscription) {
        console.error("Subscription error:", subError);
        return { success: false, error: "No active subscription found. Please subscribe to a plan." };
    }

    const { count: storeCount } = await userSupabase
        .from("shopify_stores")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", user.id);

    const { data: existingShop } = await userSupabase
        .from("shopify_stores")
        .select("id")
        .eq("user_id", user.id)
        .eq("shop_url", session.shop)
        .maybeSingle();

    const maxStores = subscription.subscription_plans?.max_stores ?? 0;
    const currentCount = storeCount ?? 0;

    if (!existingShop && currentCount >= maxStores) {
        return { 
            success: false, 
            error: `Store limit reached (${currentCount}/${maxStores}). Please upgrade your plan to connect more stores.` 
        };
    }

    const { error: dbError } = await userSupabase
        .from("shopify_stores")
        .upsert({
            user_id: user.id,
            shop_url: session.shop,
            access_token: session.accessToken,
            scope: session.scope,
            is_active: true,
            installed_at: existingShop ? undefined : new Date().toISOString(), 
            updated_at: new Date().toISOString(),
        }, { onConflict: 'shop_url' });
    
    if (dbError) {
        return { success: false, error: dbError.message };
    }

    return { success: true, connected: true };
  }

  return { success: true, shop: session.shop };
};

export default function Index() {
  const { shop, session } = useLoaderData<typeof loader>();
  console.log(session);
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();
  
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isStoreConnected, setIsStoreConnected] = useState(false);
  const [isOwnedByOther, setIsOwnedByOther] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);
  const [storeLimitError, setStoreLimitError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabaseClient) {
        setLoadingAuth(false);
        return;
    }
    
    const client = supabaseClient;

    const checkStatus = async () => {
        const { data: { session } } = await client.auth.getSession();
        
        if (!session) {
            navigate("/app/login");
            setLoadingAuth(false);
            return;
        }

        setAccessToken(session.access_token);

        // 1. Check Subscription
        const { data: subscription, error: subError } = await client
            .from("subscriptions")
            .select("*, subscription_plans(*)")
            .eq("user_id", session.user.id)
            .in("status", ["active", "trialing"])
            .maybeSingle();

        if (subError || !subscription) {
             setSubscriptionError("No active subscription found. Please subscribe to a plan.");
        } else {
             setSubscriptionError(null);
        }

        // 2. Check Store Limits
        const { count: storeCount } = await client
            .from("shopify_stores")
            .select("*", { count: 'exact', head: true })
            .eq("user_id", session.user.id);

        // Check if store is connected
        const { data, error } = await client
            .from("shopify_stores")
            .select("*")
            .eq("shop_url", shop) // shop from loader
            .maybeSingle();
        
        if (error) {
            console.error("Error checking store connection:", error);
        }

        // Calculate limits
        const maxStores = subscription?.subscription_plans?.max_stores ?? 0;
        const currentCount = storeCount ?? 0;
        
        // If this shop is NOT connected, and we are at limit
        if (!data && currentCount >= maxStores && subscription) {
             setStoreLimitError(`Store limit reached (${currentCount}/${maxStores}). Please upgrade your plan.`);
        } else {
             setStoreLimitError(null);
        }

        if (data) {
            if (data.user_id !== session.user.id) {
                setIsOwnedByOther(true);
                setIsStoreConnected(false);
            } else if (data.is_active) {
                setIsStoreConnected(true);
                setIsOwnedByOther(false);
            } else {
                setIsStoreConnected(false);
                setIsOwnedByOther(false);
            }
        } else {
            setIsStoreConnected(false);
            setIsOwnedByOther(false);
        }

        setLoadingAuth(false);
    };

    checkStatus();

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        if (!session) {
            navigate("/app/login");
        } else {
            setAccessToken(session.access_token);
        }
    });

    return () => subscription.unsubscribe();
  }, [navigate, shop, fetcher.data]);

  const handleConnect = () => {
    if (!accessToken) return;
    fetcher.submit(
        { actionType: "connect", supabaseAccessToken: accessToken },
        { method: "post" }
    );
  };

  const handleRegenerateToken = () => {
    if (!accessToken) return;
    fetcher.submit(
        { actionType: "connect", supabaseAccessToken: accessToken },
        { method: "post" }
    );
  };

  if (loadingAuth) {
      return (
          <Page>
              <BlockStack align="center" inlineAlign="center">
                  <Text as="p" variant="bodyMd">Loading...</Text>
              </BlockStack>
          </Page>
      );
  }

  const isConnecting = fetcher.state === "submitting" && fetcher.formData?.get("actionType") === "connect";

  return (
    <Page>
      <TitleBar title="Pixeo Integration" />
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="500">
                <Text as="h2" variant="headingMd">
                  Pixeo Connection
                </Text>
                
                {fetcher.data?.error && (
                    <Banner tone="critical">
                        <p>{fetcher.data.error}</p>
                    </Banner>
                )}

                {subscriptionError && (
                    <Banner tone="critical">
                        <p><strong>Subscription Required</strong></p>
                        <p>{subscriptionError}</p>
                    </Banner>
                )}

                {storeLimitError && (
                    <Banner tone="warning">
                         <p><strong>Limit Reached</strong></p>
                         <p>{storeLimitError}</p>
                    </Banner>
                )}

                {isOwnedByOther && (
                    <Banner tone="critical">
                        <p><strong>Store Unavailable</strong></p>
                        <p>This store is already connected to another Pixeo account.</p>
                        <p>Please log in with the correct account or contact support.</p>
                    </Banner>
                )}

                {fetcher.data?.success && fetcher.data?.connected && (
                    <Banner tone="success">
                        <p>Operation successful</p>
                    </Banner>
                )}

                {isStoreConnected || (fetcher.data?.connected && !isOwnedByOther) ? (
                   <BlockStack gap="400">
                      <Banner tone="success">
                        <p><strong>Connection Active</strong></p>
                        <p>Your store <strong>{shop}</strong> is linked to your Pixeo account.</p>
                      </Banner>
                      <Text as="p">
                        Pixeo has access to your themes and products.
                      </Text>
                      
                      <BlockStack gap="200">
                        <Text as="h3" variant="headingSm">Actions</Text>
                        <Button
                            onClick={handleRegenerateToken}
                            loading={isConnecting}
                            disabled={isOwnedByOther || !!subscriptionError}
                        >
                            Regenerate/Update Token
                        </Button>
                        <Text as="p" tone="subdued">
                            Use this if you need to refresh the connection permissions or token.
                        </Text>
                      </BlockStack>

                      <Button 
                        variant="primary" 
                        tone="critical"
                        onClick={async () => {
                            if (supabaseClient) {
                              await supabaseClient.auth.signOut();
                              navigate("/app/login");
                            }
                        }}
                      >
                          Log out
                      </Button>
                   </BlockStack>
                ) : (
                    <BlockStack gap="400">
                        <Banner tone="warning">
                            <p>Store not linked</p>
                            <p>This store is not yet linked to your Pixeo account.</p>
                        </Banner>
                        <Button 
                            variant="primary" 
                            onClick={handleConnect}
                            loading={isConnecting}
                            disabled={isOwnedByOther || !!subscriptionError || !!storeLimitError}
                        >
                            Connect {shop} to Pixeo
                        </Button>
                        <Button 
                            variant="plain" 
                            onClick={async () => {
                                if (supabaseClient) {
                                  await supabaseClient.auth.signOut();
                                  navigate("/app/login");
                                }
                            }}
                        >
                            Log out
                        </Button>
                    </BlockStack>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
