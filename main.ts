import OpenAI from 'npm:openai';
const openai = new OpenAI();
const thread = await openai.beta.threads.create();
await openai.beta.threads.messages.create(
  thread.id,
  {
    role: 'user',
    content: "I'd like to visit a warm country in Europe this winter." +
      +'I like polish cuisine.' + 'I like luxurious yet adventurous travels' +
      "I don't like long train or bus rides" + 'I enjoy long walks and fancy meals' +
      'Recommend me 3 countries to visit according to my preferences',
  },
);
const encoder = new TextEncoder();
await openai.beta.threads.runs.stream(thread.id, {
  assistant_id: Deno.env.get('TRAVEL_AGENT')!,
}).on('textDelta', (textDelta) => void Deno.stdout.write(encoder.encode(textDelta.value)));


/*
const completion = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    { role: 'system', content: 'You are a helpful travel agent.' },
    {
      role: 'user',
      content: "I'd like to visit a warm country in Europe this winter." +
        +'I like polish cuisine.' + 'I like luxurious yet adventurous travels' +
        "I don't like long train or bus rides" + 'I enjoy long walks and fancy meals' +
        'Recommend me 3 countries to visit according to my preferences',
    },
    { role: 'system', content: 'Follow instructions to the letter. Use no formatting, plain text' },
  ],
});
console.log(completion.choices[0].message.content);
*/
