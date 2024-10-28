import type { RouterContext } from '@oak/oak/router';
import type { GetLocationRecognitionReq } from './models.ts';
import { getReqBody } from '@utils/api.ts';
import { ai } from './ai.ts';
import { Status } from '@oak/commons/status';

export async function recognizeLocation(ctx: RouterContext<string>): Promise<void> {
  const req = await getReqBody<GetLocationRecognitionReq>(ctx);
  const { image } = req;

  if (!image) {
    ctx.throw(Status.BadRequest, `[recognizeLocation] "image" is required but not provided`);
  }

  if (!image.startsWith('data:image/') || !image.includes('base64')) {
    ctx.throw(Status.BadRequest, `[recognizeLocation] invalid "image" - must be base64`);
  }

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
          url: req.image,
          // deno-lint-ignore no-explicit-any
          detail: Deno.env.get('LOCATION_RECOGNITION_IMAGE_DETAIL') as any || 'low',
        },
      }],
    },
  ]);

  ctx.response.body = completion.choices[0].message.content;
}
