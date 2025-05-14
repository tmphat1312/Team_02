"use client";

import React from "react";
import { toast } from "sonner";

import { Stack } from "@/components/layout/stack";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";

export function DeleteAccount() {
  const [isPending, startTransition] = React.useTransition();
  const [password, setPassword] = React.useState("");

  const handleDelete = async () => {
    startTransition(async () => {
      await auth.deleteUser(
        { password, callbackURL: "/sign-in" },
        {
          onSuccess: () => {
            toast.success("Account deleted successfully");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    });
  };

  return (
    <Stack className="justify-between">
      <div>
        <p className="font-medium text-destructive">Delete account</p>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account and data
        </p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Stack orientation="vertical">
            <Label htmlFor="confirm" className="text-sm mb-2">
              Enter <strong>your password</strong> to confirm
            </Label>
            <Input
              type="password"
              id="confirm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleDelete();
                }
              }}
            />
          </Stack>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/80"
              disabled={isPending}
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Stack>
  );
}
