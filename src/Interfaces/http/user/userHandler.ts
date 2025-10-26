import { Context } from 'hono';
import { containerPayload } from '../../../Infrastructures/container';

const UserHandler = ({
  addUserUseCase,
  updateUserUseCase,
  getUserUseCase,
  deleteUserUseCase,
}: containerPayload) => ({
  createAccount: async (c: Context) => {
    const status = await addUserUseCase.execute(await c.req.json());
    return c.json({ data: status }, 201);
  },
  getAccount: async (c: Context) => {
    const status = await getUserUseCase.execute();
    return c.json({ data: status }, 200);
  },
  updateAccount: async (c: Context) => {
    const { userid } = c.req.param();

    const status = await updateUserUseCase.execute(userid, await c.req.json());
    return c.json({ data: status }, 201);
  },
  deleteAccount: async (c: Context) => {
    const { userid } = c.req.param();

    const status = await deleteUserUseCase.execute(userid);
    return c.json({ data: status }, 203);
  },
});

export default UserHandler;
