import { Account, Client, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.crashcourse',
    projectId: '66f6e8f30013e664f809',
    databaseId: '66f6e9f50005219d0d7d',
    userCollectionId: '66f6ea0e003807f5e4a7',
    videoCollectionId: '66f6ea210008ed1cf2cf',
    storageId: '66f6eb0a001689dd3a81'
}

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(endpoint) // Your Appwrite Endpoint
    .setProject(projectId) // Your project ID
    .setPlatform(platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser = async (email, password, username) => 
{
  try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username

    )

    if (!newAccount) throw Error;
    const AvatarUrl = avatars.getInitials(username)
    await signIn(email, password);
    const newUser = await databases.createDocument(
        databaseId, 
        userCollectionId, 
        ID.unique(), { 
        accountId: newAccount.$id,
        email,
        username,
        avatar: AvatarUrl
    })

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error)
    }
}



export const getCurrentUser = async () => {
    try {
      const currentAccount = await account.get();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        databaseId,
        userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
      )
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
    }
  }

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
    databaseId,
    videoCollectionId
  )

  return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
    databaseId,
    videoCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(7)]
  )

  return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
    databaseId,
    videoCollectionId,
    [Query.search('title', query)]
  )

  return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}