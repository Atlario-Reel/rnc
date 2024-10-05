import { View, Image, TouchableOpacity } from 'react-native'
import { React, useState } from 'react'
import { icons } from '../constants'
import { useGlobalContext } from '../context/GlobalProvider'
import { updateBookmark } from '../lib/appwrite'

const BookMarkButton = ({ bookmarkedBy, videoId }) => {
  const { user } = useGlobalContext();
  const [isBookmarked, setIsBookmarked] = useState(bookmarkedBy.includes(user.$id))

  const addBookmark = async () => {
    const newBookmarkedBy = bookmarkedBy;
    if (!isBookmarked) {
        newBookmarkedBy.push(user.$id);  
        try {
            await updateBookmark(
              {newBookmarkedBy, videoId}
            )
            setIsBookmarked(true)
          } catch (error) {
            Alert.alert('Error', error.message)
          } 
    } 
  }

  const RemoveBookmark = async () => {
    const index = bookmarkedBy.indexOf(user.$id);
    const newBookmarkedBy = bookmarkedBy;
   
    if (isBookmarked) {
        newBookmarkedBy.splice(index, 1);

        try {
            await updateBookmark(
              {newBookmarkedBy, videoId},
            )
            setIsBookmarked(false)
          } catch (error) {
            Alert.alert('Error', error.message)
          } 
    } 
  }

  return (
    
    <View className="pt-2">
        { !isBookmarked ? (
            <TouchableOpacity
                onPress={addBookmark}>
                <Image source={icons.bookmark} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity> 
        ) : (
            <TouchableOpacity
                onPress={RemoveBookmark}>
                <Image source={icons.bookmarkActive} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        )}
    </View>
  )
}

export default BookMarkButton