import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import LogoutButton from "../components/LogoutButton";
import AddDeviceButton from "../components/AddDeviceButton";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../services/FirebaseConfig';
import { useFocusEffect } from "@react-navigation/native";
import DeviceCard from "../components/DeviceCard";
import EditDeviceModal from "../components/EditDeviceModal";
import ThemeSwitch from "../components/ThemeSwitch";
import { useTheme } from "../hooks/useTheme";

export default function Dashboard({ navigation }) {
    const { theme } = useTheme();
    const [devices, setDevices] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const fetchDevices = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'devices'));
            const devicesList = [];
            querySnapshot.forEach((doc) => {
                devicesList.push({ id: doc.id, ...doc.data() });
            });
            setDevices(devicesList);
        } catch (error) {
            Alert.alert("Erro ao buscar dispositivos: ", error.message);
        }
    };
    const handleDeleteDevice = () => {
        fetchDevices();
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
            backgroundColor: theme === 'light' ? '#F5F5F5' : '#121212',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 24,
            marginBottom: 20,
            fontWeight: 'bold',
        },
    });
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Meus Dispositivos</Text>

            <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <DeviceCard
                        id={item.id}
                        name={item.name}
                        consumption={item.consumption}
                        type={item.type}
                        onDelete={() => handleDeleteDevice(item.id)}
                        onEdit={() => openEditModal(item)}
                    />
                )}
            />
            <LogoutButton navigation={navigation} />
            <AddDeviceButton navigation={navigation} />
            <EditDeviceModal
                isVisible={isModalVisible}
                device={selectedDevice}
                onClose={closeModal}
                onUpdate={fetchDevices}
            />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", minWidth: '90%' }}>
                <Text style={styles.text}>Alterar tema</Text>
                <ThemeSwitch />
            </View>
        </SafeAreaView>
    )
}
