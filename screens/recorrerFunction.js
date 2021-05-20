import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function recorrerFunction(){
        const arInforms=[];
        let counter=0;
        const currentDay = new Date().getDay();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        for(let i=0;i!=0;i++){
            console.log({i});
            let val = await AsyncStorage.getItem(currentYear+"."+currentMonth+"."+currentDay+"."+i);
            if(val==null){counter=i;break;}
            arInforms.push(val);
        }
        return counter;
}