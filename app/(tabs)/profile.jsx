import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signOut } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import { icons } from '../../constants'
import InfoBox from '../../components/InfoBox'
import { router } from 'expo-router'


const Profile = () => {
  const { user, setUser, setisLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const logout = async () => {
    await signOut();
    router.replace('/sign-in')
    setUser(null)
    setisLoggedIn(false)
  }



  return (
    <SafeAreaView className="bg-primary h-full"
    edges={['right', 'left', 'top']} >
      <FlatList 
       data={posts}
       
        keyExtractor={(item) => item.$id}
        renderItem={( {item} ) => (
          <VideoCard video={item}
          
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6"/>
            </TouchableOpacity>

          <View className="border-secondary rounded-lg justify-center items-center border w-16 h-16">
            <Image 
              source={{ uri: user?.avatar }}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>
          <InfoBox
            title={user?.username}
            containerStyles='mt-5'
            titleStyles="text-lg"
          />
          <View className="mt-5 flex-row">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles='mr-10'
                titleStyles="text-xl"
              />
                  <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
          </View>

                
   
          </View>

         
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
     
      />
    <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
     
  )
}

export default Profile