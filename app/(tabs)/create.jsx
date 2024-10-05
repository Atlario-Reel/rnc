import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '../../components/FormField'
import { useState } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { icons } from '../../constants'
import CustomButton from '../../components/CustomButton'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import * as ImagePicker from 'expo-image-picker'

const Create = () => {
  const { user } = useGlobalContext();
    const [uploading, setUploading] = useState(false)
    const [form, setForm] = useState({
      titel: '',
      video: null,
      thumbnail: null,
      prompt: ''
    })

    const submit = async () => {
      if(!form.prompt || !form.title || !form.thumbnail || !form.video) {
        return Alert.alert('Please fill in all the fields')
      }

      setUploading(true)

      try {
        console.log('Video', form.video);
        await createVideo(
          {...form, userId: user.$id}
        )
        Alert.alert('Success', 'Post uploaded succesfully')
        router.push('/home')
      } catch (error) {
        Alert.alert('Error', error.message)
      } finally {
        setForm({
          titel: '',
          video: null,
          thumbnail: null,
          prompt: ''
        })
        setUploading(false);
      }
    }

    const openPicker = async (selectType) => {
       let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
      });

      if(!result.canceled) {
        if(selectType === 'image') {
          setForm({ ...form, thumbnail: result.assets[0] })
        }
        if(selectType === 'video') {
          setForm({ ...form, video: result.assets[0] })
        }
      }
    }
  
  return (
    

    <SafeAreaView className="bg-primary h-full  ">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>
        <FormField 
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e})}
          otherStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video 
                source={{ uri: form.video.uri}}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
      
              />
            ) : (
              <View className="w-full rounded-2xl justify-center bg-black-100 items-center h-40 px-4">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image 
                    source={icons.upload}
                    resizeMode="Contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )
          
          } 
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
        <Text className="text-base text-gray-100 font-pmedium">Choose Thumbnail</Text>
        <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image 
              source={{ uri: form.thumbnail.uri}}
                resizeMode="Cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full rounded-2xl justify-center bg-black-100 items-center h-16 px-4 border-2 border-black-200 flex-row space-x-2">
               
                  <Image 
                    source={icons.upload}
                    resizeMode="Contain"
                    className="w-5 h-5"
                  />
                  <Text className="text-sm font-pmedium text-gray-100">
                    Choose a file
                  </Text>
                
              </View>
            )
          
          } 
          </TouchableOpacity>
        </View>

        <FormField 
          title="AI Prompt"
          value={form.prompt}
          placeholder="The prompt you used to create this video."
          handleChangeText={(e) => setForm({ ...form, prompt: e})}
          otherStyles="mt-7"
        />
        <CustomButton 
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create