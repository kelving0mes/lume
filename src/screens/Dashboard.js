import { Alert, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import AddDeviceButton from "../components/AddDeviceButton";
import { useFocusEffect } from "@react-navigation/native";
import DeviceCard from "../components/DeviceCard";
import EditDeviceModal from "../components/EditDeviceModal";
import ThemeSwitch from "../components/ThemeSwitch";
import { useTheme } from "../hooks/useTheme";
import { getDevices, deleteDevice } from "../API/ApiDevices";

export default function Dashboard({ navigation }) {
    const { theme } = useTheme();
    const [devices, setDevices] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);

    const fetchDevices = async () => {
        try {
            const deviceData = await getDevices();
            setDevices(deviceData);
        } catch (error) {
            Alert.alert("Erro ao buscar dispositivos: ", error.message);
        }
    };

    const handleDeleteDevice = async (id) => {
        try {
            await deleteDevice(id);
            fetchDevices();
            Alert.alert("Dispositivo excluído com sucesso!");
        } catch (error) {
            Alert.alert("Erro ao excluir dispositivo", error.message);
        }
    };

    const openEditModal = (device) => {
        setSelectedDevice(device);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchDevices();
        }, [])
    );

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme === 'light' ? '#F5F5F5' : '#372f36',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
        },
        title: {
            marginTop: 10,
            color: theme === 'light' ? '#424242' : '#FFFFFF',
            fontSize: 24,
            marginBottom: 20,
            marginLeft: 10,
            fontWeight: 'bold',
            alignSelf: 'flex-start',
        },
        bottomSection: {
            marginTop: 20,
            flexDirection: 'row',
            width: '100%',
            gap: 30,
            marginBottom: 20,
            marginLeft: 10,
        },
    });

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle= {theme === 'light'? 'dark-content':'light-content'} backgroundColor={theme === 'light'? '#F5F5F5':'#1B1A26'} />
            <Text style={styles.title}>Meus Dispositivos</Text>
            <FlatList
                data={devices} 
                keyExtractor={(item) => item.id.toString()} 
                renderItem={({ item }) => (
                    <DeviceCard
                        id={item.id}
                        name={item.nome} 
                        consumption={item.consumoMedio} 
                        type={item.tipo} 
                        onDelete={() => handleDeleteDevice(item.id)} 
                        onEdit={() => openEditModal(item)} 
                    />
                )}
            />


            <View style={styles.bottomSection}>
                <ThemeSwitch />
                <LogoutButton navigation={navigation} />
            </View>
            <AddDeviceButton navigation={navigation} />

            <EditDeviceModal
                isVisible={isModalVisible}
                device={selectedDevice}
                onClose={closeModal}
                onUpdate={fetchDevices} 
            />
        </SafeAreaView>
    );
}
