/* eslint-disable @typescript-eslint/no-explicit-any */
import InvariantError from '../errorHandling/InvariantError';

export async function prismaHandle(error: any): Promise<never> {
  if (error?.code === 'P2002')
    throw new InvariantError('Bad Request: Register object already registered in database!');
  if (error?.code === 'P2001') throw new InvariantError('Bad Request: Request Target not found!');
  if (error?.code === 'P2025') throw new InvariantError('Bad Request: Request Target not found!');
  if (error?.code === 'P2003')
    throw new InvariantError('Bad Request: Request payload does not meet database criteria!');
  throw new InvariantError('Internal Error: Please, Contact Administrator!');
}
