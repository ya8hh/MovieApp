import MovieCard from "@/components/MovieCard";
import SerachBar from "@/components/SerachBar";
import TrendingCard from "@/components/TrendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
export default function Index() {
  console.log("[Index Component] Rendered ✅");
  const router =useRouter();

  const {
    data : trendingMovies,
    loading : trendingLoading,
    error : trendingError

  } = useFetch(getTrendingMovies)

  const {  data : movies ,
    loading : moviesLoading ,
    error : moviesError} = useFetch(()=> fetchMovies({
    query: ''
  }))
  // console.log("Fetched Movies:", movies);
  return (
    <View className="flex-1 bg-primary">
     <Image 
     source={images.bg}
     className="absolute w-full z-0"
     />
     <ScrollView className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight:"100%" , paddingBottom:10
        }}
     >
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>


      { moviesLoading || trendingLoading  ? ( <ActivityIndicator
       size="large"
       color="#000ff"
       className="mt-10 self-center"
      />):moviesError || trendingError ? (
        <Text>{ moviesError?.message||trendingError?.message }</Text>
      ) : (
         <View  className="flex-1 mt-5"  > 
              <SerachBar
              onPress={()=>router.push("/search")}
              placeholder="Search For A Movie"
              />
                {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovies}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}


              <>
                  <Text className="text-white text-lg font-bold mt-5 mb-3 ">Latest Movies</Text>
                  <FlatList
                     scrollEnabled={false}
                     data={movies}
                     renderItem={({item}) => (
                         <MovieCard
                         {...item}
                         />
                     ) }
                     keyExtractor={(item)=>item.id.toString()}
                     numColumns={3}
                     columnWrapperStyle={{
                      justifyContent:'flex-start',
                      gap:20,
                      paddingRight:5,
                      marginBottom:10
                     }}
                     className="mt-2 pb-32"
                  />
              </>

          </View>
      ) }
     
     </ScrollView>
      
    </View>
  );
}
