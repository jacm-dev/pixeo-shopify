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
  return { shop: session.shop, connection: null };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  
  const actionType = formData.get("actionType");
  const supabaseAccessToken = formData.get("supabaseAccessToken") as string;

  if (actionType === "disconnect") {
     // Handle disconnect if needed
     // Ideally we should also use the user token to verify ownership before deleting
     return { success: true, disconnected: true };
  }

  if (actionType === "connect") {
    if (!supabaseAccessToken) {
        return { success: false, error: "Missing Supabase token" };
    }

    // Create a Supabase client scoped to the user
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;
    
    const userSupabase = createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: `Bearer ${supabaseAccessToken}`,
            },
        },
    });

    // Get the user to verify the token is valid
    const { data: { user }, error: userError } = await userSupabase.auth.getUser();

    if (userError || !user) {
        return { success: false, error: "Invalid Supabase token" };
    }

    // Upsert the connection
    const { error: dbError } = await userSupabase
        .from("shopify_stores")
        .upsert({
            user_id: user.id,
            shop_url: session.shop,
            access_token: session.accessToken,
            scope: session.scope,
            is_active: true,
            installed_at: new Date().toISOString(),
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
  const { shop } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();
  
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [isStoreConnected, setIsStoreConnected] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Check auth and connection status
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

        // Check if store is connected
        const { data, error } = await client
            .from("shopify_stores")
            .select("*")
            .eq("shop_url", shop) // shop from loader
            .maybeSingle();
        
        if (error) {
            console.error("Error checking store connection:", error);
        }

        if (data && data.is_active) {
            setIsStoreConnected(true);
        } else {
            setIsStoreConnected(false);
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
  }, [navigate, shop, fetcher.data]); // Re-run if fetcher completes

  const handleConnect = () => {
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

  // If fetcher just succeeded, update state optimistically or wait for useEffect re-check?
  // useEffect depends on fetcher.data, so it might re-check. 
  // But let's look at fetcher state to be responsive.
  const isConnecting = fetcher.state === "submitting" && fetcher.formData?.get("actionType") === "connect";
  
  // Update local state if fetcher returns success
  if (fetcher.data?.success && fetcher.data?.connected && !isStoreConnected) {
      // Optimistic update or just rely on the re-render
      // Better to rely on the effect re-fetching or setting it here if we trust the server response
      // But we can't easily set state in render.
      // We'll rely on the useEffect hook which includes fetcher.data dependency.
  }

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

                {isStoreConnected || (fetcher.data?.connected) ? (
                   <BlockStack gap="400">
                      <Banner tone="success">
                        <p><strong>Connection Active</strong></p>
                        <p>Your store <strong>{shop}</strong> is linked to your Pixeo account.</p>
                      </Banner>
                      <Text as="p">
                        Pixeo has access to your themes and products.
                      </Text>
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
