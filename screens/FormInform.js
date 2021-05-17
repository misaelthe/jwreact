import React,{useState} from 'react';
import { View, Text, Button, StyleSheet } from 'react-native'
import { useForm } from "react-hook-form";

const Cat = (props) => {
    const [isHungry, setIsHungry] = useState(true); 

    return (<View style={catStyles.butCat}>
        <Text>Estoy {isHungry==true?"hambriento":"sasiado"}</Text>
        <Button title={"I am "+props.name+", and I am "+ (isHungry==true?"starving":"satisfied")} onPress={()=>{
            isHungry==true?setIsHungry(false):setIsHungry(true);
            }}
            disabled={!isHungry}>

        </Button>
    </View>
    );
}
const FormInform = () => {
    const { register, errors, handleSubmit } = useForm();

    return (
        <View>
            <Cat name="Michi" />
            <Cat name="Felix" />
        </View>
    );

}
const catStyles = StyleSheet.create({
    butCat: { marginVertical: 25, width: 500,}
});
export default FormInform;