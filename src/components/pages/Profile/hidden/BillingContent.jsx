import React from "react";
import { Separator } from "../../../ui/separator";
import { Button } from "../../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { CreditCard } from "lucide-react";
export default function BillingContent() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Billing & Subscription
        </h1>
        <p className="text-muted-foreground">
          Manage your billing information and subscription plan
        </p>
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the Pro plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">Pro Plan</h3>
                <p className="text-sm text-muted-foreground">
                  $15/month, billed monthly
                </p>
              </div>
              <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                Current Plan
              </div>
            </div>
            <Separator className="my-4" />
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <svg
                    className="h-3 w-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span>Unlimited projects</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <svg
                    className="h-3 w-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="rounded-full bg-primary/20 p-1">
                  <svg
                    className="h-3 w-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span>Priority support</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline">Change Plan</Button>
          <Button variant="destructive">Cancel Subscription</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-md border p-2">
                <CreditCard className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/2024</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Add Payment Method</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
