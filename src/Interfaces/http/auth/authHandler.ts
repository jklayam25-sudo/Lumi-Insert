import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';

const AuthHandler = ({ loginUserUseCase, logoutUserUseCase }: containerPayload) => ({
  loginAuth: async (c: Context) => {
    const { accessToken, refreshToken } = await loginUserUseCase.execute(await c.req.json());
    setCookie(c, 'LUMIALBCORS', accessToken);
    setCookie(c, 'LUMIALBRCORS', refreshToken);

    return c.json({ success: 'true' }, 200);
  },
  deleteAuth: async (c: Context) => {
    const refreshToken = getCookie(c, 'LUMIALBRCORS') as string;
    const status = await logoutUserUseCase.execute(refreshToken);
    if (status) {
      deleteCookie(c, 'LUMIALBCORS');
      deleteCookie(c, 'LUMIALBRCORS');
    }

    return c.json({ success: 'true' }, 203);
  },
});

export default AuthHandler;
