import { useState, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useNavigate } from "react-router";
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
import { authenticate } from "../shopify.server";
import { supabase as supabaseClient } from "../supabase.client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { shop: session.shop, connection: null };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { session } = await authenticate.admin(request);
  return { success: true, shop: session.shop };
};

export default function Index() {
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    if (!supabaseClient) {
        setLoadingAuth(false);
        return;
    }

    const client = supabaseClient;

    const checkSession = async () => {
        const { data: { session } } = await client.auth.getSession();
        if (!session) {
            navigate("/app/login");
        } else {
            setIsAuthenticated(true);
        }
        setLoadingAuth(false);
    };

    checkSession();

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        if (!session) {
            navigate("/app/login");
        } else {
            setIsAuthenticated(true);
        }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Determine connection state based on auth
  const isConnected = isAuthenticated;
  
  if (loadingAuth) {
      return (
          <Page>
              <BlockStack align="center" inlineAlign="center">
                  <Text as="p" variant="bodyMd">Loading...</Text>
              </BlockStack>
          </Page>
      );
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
                
                {isConnected ? (
                   <BlockStack gap="400">
                      <Banner tone="info">
                        <p>You are logged in to Pixeo.</p>
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
                    <Text as="p" variant="bodyMd">Redirecting to login...</Text>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
