import OpenAI from 'npm:openai';

class AI {
  private readonly openai = new OpenAI();
  private readonly threads = this.openai.beta.threads;

  public createThread() {
    return this.threads.create();
  }

  public sendMessage(threadId: string, role: 'user' | 'assistant', content: string) {
    return this.threads.messages.create(threadId, { role, content });
  }

  public createChat(threadId: string, assistantId: string) {
    return this.threads.runs.stream(threadId, { assistant_id: assistantId });
  }
}

export const ai = new AI();
