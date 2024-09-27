import { Account, Client, ID, Avatars, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.crashcourse',
    projectId: '66f6e8f30013e664f809',
    databaseId: '66f6e9f50005219d0d7d',
    userCollectionId: '66f6ea0e003807f5e4a7',
    videoCollectionId: '66f6ea210008ed1cf2cf',
    storageId: '66f6eb0a001689dd3a81'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
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
        appwriteConfig.databaseId, 
        appwriteConfig.userCollectionId, 
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

export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;
    } catch (error) {
        throw new Error(error)
    }
}