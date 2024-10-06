import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants';
import { router } from 'expo-router';

const SearchBookmarkInput = ({title, initalQuery, value, placeholder, handleChangeText, otherStyles, ...props}) => {

    const [query, setQuery] = useState(initalQuery || '')
     
  /*  const onWriting = async () => {
      
        router.setParams({query});
        await refetch(); 
    } */

        const onWriting = async (e) => {
            setQuery(e)
          /*  router.setParams(e);
            console.log(e)
            await refetch(); 
            const newQuery = e; */
        }

  return (
    
 
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput 
            className="flex-1 text-white font-psemibold text-base mt-0.5 text-white flex-1 font-pregular"
            value={onWriting.newQuery}
            placeholder={'Search your saved videos'}
            placeholderTextColor="#CDCDE0"
            onChangeText={onWriting}
      
        />
        
       <TouchableOpacity
        onPress={async () => {
           
            console.log(query);
            router.setParams({query});
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

export default SearchBookmarkInput