import { z } from 'zod';
import { asyncWrapper } from '../../../../utils/asyncWrapper.js';
import { basePublicUrl, requireEmptyQuery, zodErrorToHTTP } from '@nangohq/utils';
import type { PostManagedSignup } from '@nangohq/types';
import { getWorkOSClient } from '../../../../clients/workos.client.js';

export interface InviteAccountState {
    token: string;
}

const validation = z
    .object({
        provider: z.enum(['GoogleOAuth']),
        token: z.string().uuid().optional()
    })
    .strict();

export const postManagedSignup = asyncWrapper<PostManagedSignup>((req, res) => {
    const emptyQuery = requireEmptyQuery(req);

    if (emptyQuery) {
        res.status(400).send({ error: { code: 'invalid_query_params', errors: zodErrorToHTTP(emptyQuery.error) } });
        return;
    }

    const val = validation.safeParse(req.body);
    if (!val.success) {
        res.status(400).send({
            error: { code: 'invalid_body', errors: zodErrorToHTTP(val.error) }
        });
        return;
    }

    const body: PostManagedSignup['Body'] = val.data;

    const workos = getWorkOSClient();
    const oAuthUrl = workos.userManagement.getAuthorizationUrl({
        clientId: process.env['WORKOS_CLIENT_ID'] || '',
        provider: body.provider,
        // TODO: change to baseUrl but the cookie is not working as intended
        redirectUri: `${basePublicUrl}/api/v1/login/callback`,
        state: body.token ? Buffer.from(JSON.stringify({ token: body.token } satisfies InviteAccountState)).toString('base64') : ''
    });

    res.send({ data: { url: oAuthUrl } });
});
