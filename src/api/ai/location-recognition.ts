import type { RouterContext } from '@oak/oak/router';
import { ai } from './ai.ts';
import { Status } from '@oak/commons/status';
import { encodeBase64 } from 'https://deno.land/std/encoding/base64.ts';

export async function recognizeLocation(ctx: RouterContext<string>): Promise<void> {
  const req = await ctx.request.body.formData();
  const image = req.get('image') as File;

  if (!image) {
    ctx.throw(Status.BadRequest, `[recognizeLocation] "image" is required but not provided`);
  }

  const base64 = encodeBase64(await image.arrayBuffer());

  const completion = await ai.createCompletion([
    {
      role: 'system',
      content: [{
        type: 'text',
        text: Deno.env.get('LOCATION_RECOGNITION_INSTRUCTIONS') || "Tell what's in the image",
      }],
    },
    {
      role: 'user',
      content: [{
        type: 'image_url',
        image_url: {
          url: `data:image/jpeg;base64,${base64}`,
          // deno-lint-ignore no-explicit-any
          detail: Deno.env.get('LOCATION_RECOGNITION_IMAGE_DETAIL') as any || 'low',
        },
      }],
    },
  ]);

  ctx.response.body = completion.choices[0].message.content;
}
