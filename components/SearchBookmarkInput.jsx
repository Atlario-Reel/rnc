import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

const SearchInput = ({title, initalQuery, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [query, setQuery] = useState(initalQuery || '')
     

  return (
 
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput 
            className="flex-1 text-white font-psemibold text-base mt-0.5 text-white flex-1 font-pregular"
            value={query}
            placeholder={'Search your saved videos'}
            placeholderTextColor="#CDCDE0"
            onChangeText={(e) => setQuery(e)}
      
        />
        
       <TouchableOpacity
        onPress={async () => {
            if(!query) {
                return Alert.alert('Missing query', "Please input something to search results across your bookmarks")
            } 
            
            await refetch();
        }
        }
       >
        <Image 
            source={ icons.search }
            className='w-5 h-5'
            resizeMode='contain'
        />
       </TouchableOpacity>
      </View>

  )
}

export default SearchInput