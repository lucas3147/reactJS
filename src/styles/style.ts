import styled from "styled-components/native";

export const ViewHomeContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ViewBox = styled.View`
    padding: 20px;
    background-color: rgba(0,0,0,0.1);
    border-radius: 10px;
    height: 150px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const PressableDefault = styled.Pressable`
    border-radius: 10px;
    background-color: rgb(70, 149, 74);
    color: 'white';
`;

export const ScrollViewDefault = styled.ScrollView`
    top: 250px;
    height: 170px;
`;