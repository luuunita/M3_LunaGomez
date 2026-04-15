import { mockAnthropicRequest } from "./anthropicMock.js";
import { RICK_SYSTEM_PROMPT } from "./systemPrompt.js";

export function buildPayload({
    messages, 
    model = "claude-3-5-haiku-latest", 
    maxTokens = 500,
}) {
return {
  maxTokens: maxTokens,
  messages,
  model,
  system: RICK_SYSTEM_PROMPT,
};
}

export function normalizeContent(content = []) {
    return content
    .filter((block) => block?.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();
}

export async function requestAnthropicReply({messages}) {
    const payload = buildPayload({messages})
    const result = await mockAnthropicRequest(payload);

    const text = normalizeContent(result.data.content);

    return { 
        text,
        model: result.data.model,
        usage: result.data.usage,
    };

}
