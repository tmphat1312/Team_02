"use client";

import { useState } from "react";

import { TextAlert } from "@/components/typography/text-alert";

import { Stack } from "@/components/layout/stack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { useCommonRules } from "../../../hooks/use-common-rules";
import {
  StepDescription,
  StepHeader,
  StepHeading,
  StepSection,
} from "../../step";
import {
  ActionType,
  useCreateListingContext,
} from "../../../contexts/create-listing-context";

export function RuleForm() {
  const { state, dispatch } = useCreateListingContext();
  const { data: commonRules, isLoading } = useCommonRules();
  const [selectedRules, setSelectedRules] = useState<Set<number>>(
    new Set(state.rules)
  );
  const [customRule, setCustomRule] = useState("");
  const [customRules, setCustomRules] = useState<string[]>(state.customRules);

  const customRuleDisabled = customRule.length <= 5;

  const handleRuleChange = (ruleId: number) => {
    const newSet = new Set(selectedRules);
    if (newSet.has(ruleId)) {
      newSet.delete(ruleId);
    } else {
      newSet.add(ruleId);
    }
    setSelectedRules(newSet);
    dispatch({
      type: ActionType.SET_RULES,
      payload: Array.from(newSet),
    });
  };

  const handleCustomRuleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customRuleDisabled) return;

    const newCustomRules = [customRule, ...customRules];
    setCustomRules(newCustomRules);
    dispatch({
      type: ActionType.SET_CUSTOM_RULES,
      payload: newCustomRules,
    });
    setCustomRule("");
  };

  const handleCustomRuleRemove = (index: number) => {
    const newCustomRules = customRules.filter((_, i) => i !== index);
    setCustomRules(newCustomRules);
    dispatch({
      type: ActionType.SET_CUSTOM_RULES,
      payload: newCustomRules,
    });
  };

  if (isLoading) {
    return <TextAlert>Loading...</TextAlert>;
  }

  if (!commonRules || commonRules.length === 0) {
    return <TextAlert>No rules found</TextAlert>;
  }

  return (
    <StepSection className="max-h-140 overflow-y-auto w-2xl py-2 ps-1 pe-2 space-y-8!">
      <StepSection>
        <StepHeader>
          <StepHeading>Common Rules</StepHeading>
          <StepDescription>
            You can select common rules for your listing. Custom rules are also
            available.
          </StepDescription>
        </StepHeader>
        <ul className="space-y-3.5">
          {commonRules.map((rule) => (
            <li key={rule.id}>
              <input
                type="checkbox"
                id={rule.id.toString()}
                name={rule.id.toString()}
                className="hidden peer"
                defaultChecked={selectedRules.has(rule.id)}
              />
              <label
                htmlFor={rule.id.toString()}
                className="text-lg peer-checked:ring-2 peer-checked:bg-gray-50 border cursor-pointer px-4 py-2 rounded-full inline-block"
                onClick={() => handleRuleChange(rule.id)}
              >
                {rule.name}
              </label>
            </li>
          ))}
        </ul>
      </StepSection>
      <StepSection>
        <StepHeader>
          <StepHeading>Custom Rules</StepHeading>
          <StepDescription>
            Every home is different — feel free to write your own rules.
          </StepDescription>
        </StepHeader>
        <form className="mb-4" onSubmit={handleCustomRuleSubmit}>
          <Stack className="gap-2">
            <Label className="w-full">
              <Input
                type="text"
                placeholder="Add a custom rule"
                className="border border-gray-300 rounded-lg py-2 px-3 text-base! placeholder:text-sm! h-10"
                value={customRule}
                onChange={(e) => setCustomRule(e.target.value)}
              />
            </Label>
            <Button
              size={"icon"}
              variant={"outline"}
              className="size-10 border-2"
              aria-label="Add custom rule"
              disabled={customRuleDisabled}
            >
              <Plus className="stroke-foreground" />
            </Button>
          </Stack>
        </form>
        <ul className="flex flex-wrap gap-3.5 mb-8">
          {customRules.map((rule, index) => (
            <li
              key={index}
              className="text-lg border ps-4 pe-2 py-2 rounded-full inline-flex"
            >
              {rule}
              <button
                aria-label="Remove custom rule"
                className="ms-2 cursor-pointer hover:scale-110 hover:text-destructive"
                onClick={() => handleCustomRuleRemove(index)}
              >
                <X className="size-5" />
              </button>
            </li>
          ))}
        </ul>
      </StepSection>
    </StepSection>
  );
}
