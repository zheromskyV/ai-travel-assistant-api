import OpenAI from 'openai';

class AI {
  private readonly openai = new OpenAI();
  private readonly threads = this.openai.beta.threads;

  private get model() {
    return Deno.env.get('AI_MODEL') || 'gpt-4o-mini';
  }

  public createThread() {
    return this.threads.create();
  }

  public retrieveThread(id: string) {
    return this.threads.retrieve(id);
  }

  public sendMessage(threadId: string, role: 'user' | 'assistant', content: string) {
    return this.threads.messages.create(threadId, { role, content });
  }

  public createChat(threadId: string, assistantId: string) {
    return this.threads.runs.stream(threadId, { assistant_id: assistantId });
  }

  public createCompletion(messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[]) {
    return this.openai.chat.completions.create({
      model: this.model,
      messages,
    });
  }
}

export const ai = new AI();
