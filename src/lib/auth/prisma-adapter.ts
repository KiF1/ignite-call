import { NextApiRequest, NextApiResponse } from 'next'
import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { parseCookies, destroyCookie } from 'nookies'

export function PrismaAdapter(req: NextApiRequest, res: NextApiResponse): Adapter {
  return {
    async createUser(user) {
      const { '@ignitecall:userId': userIdInCookies } = parseCookies({ req }) 
      
      if(!userIdInCookies){
        throw new Error('User ID not found in cookies')
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdInCookies
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        }
      })
      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/'
      })
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      if(!user){
        return null
      }
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })
      if(!user){
        return null
      }
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })
      if(!account){
        return null
      }
      const { user } = account;
      return {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email!,
        emailVerified: null,
        avatar_url: user.avatar_url!,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id!,
        },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url, 
        },
      })
      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email!,
        emailVerified: null,
        avatar_url: prismaUser.avatar_url!,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          user_id: account.userId,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.access_token,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        }
      })
    },

    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })
      return { userId, sessionToken, expires }
    },

    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: { session_token: sessionToken },
        include: { user: true },
      })
      if(!prismaSession){
        return null
      }
      const { user, ...session } = prismaSession
      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email!,
          emailVerified: null,
          avatar_url: user.avatar_url!,
        }
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId, 
        },
      })
      return { 
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id, 
        expires: prismaSession.expires}
    },

    async deleteSession(sessionToken){
      await prisma.session.delete({
        where: {
          session_token: sessionToken
        }
      })
    }
  }
}