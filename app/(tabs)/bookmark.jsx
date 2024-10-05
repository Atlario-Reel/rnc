import { View, Text, FlatList,RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import SearchBookmarkInput from '../../components/SearchBookmarkInput'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider'
import { showBookmarkedPosts } from '../../lib/appwrite'



const Bookmark = () => {
  const { user } = useGlobalContext();
  const query = "";
  const { data: posts, refetch } = useAppwrite(() => showBookmarkedPosts(query, user.$id));

  useEffect(() => {
    refetch()
  }, [query])

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }



  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={( {item} ) => (
          <VideoCard video={item}
          
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            
                <Text className="text-2xl font-psemibold text-white">Saved Videos</Text>

                <View className="mt-6 mb-8">
                <SearchBookmarkInput initalQuery=''
                  placeholder='Search your saved videos'/>
                </View>

                
   
          </View>

         
        )}
        ListEmptyComponent={() => (
          <EmptyState 
            title="No Videos bookmarked"
            subtitle="Bookmark some videos now"
            isBookmark
          />
        )}
        refreshControl={<RefreshControl 
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      />
    <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  )}

export default Bookmark