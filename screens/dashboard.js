import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, TextInput, Modal, Button } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';

const Dashboard = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [students, setStudents] = useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const renderStudent = ({ item }) => {
    const screenWidth = Dimensions.get('window').width;
    const numColumns = 3;
    const itemWidth = (screenWidth - 40) / numColumns; // Subtracting the total horizontal margins
  
    return (
      <TouchableOpacity style={[styles.studentGrid, { width: itemWidth }]}>
        <View>
          <Text style={styles.studentName}>{item.name}</Text>
          <Text style={styles.studentId}>{item.id}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>P</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueBar}>
        <Text style={styles.title}>ATTENDANCE</Text>
      </View>

      <View style={styles.dropdownContainer}>
        {/* Dropdown for Select Class */}
        <Dropdown
          highlightStyle={{
            backgroundColor: 'white', // Background color of dropdown items
            color: 'black', // Text color of dropdown items
          }}
          label="Select Class"
          data={[
            { label: 'Class 1', value: 'class1' },
            { label: 'Class 2', value: 'class2' },
            { label: 'Class 3', value: 'class3' },
            { label: 'Class 4', value: 'class4' },
            { label: 'Class 5', value: 'class5' },
            { label: 'Class 6', value: 'class6' },
            { label: 'Class 7', value: 'class7' },
            { label: 'Class 8', value: 'class8' },
            { label: 'Class 9', value: 'class9' },
            { label: 'Class 10', value: 'class10' },
          ]}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Class"
          searchPlaceholder="Search..."
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
          renderLeftIcon={() => (
            <Icon style={styles.icon} name="Safety" size={20} />
          )}
        />
        {/* Dropdown for Select Subject */}
        <Dropdown
          highlightStyle={{
            backgroundColor: 'white', // Background color of dropdown items
            color: 'black', // Text color of dropdown items
          }}
          label="Select Subject"
          data={[
            { label: 'English', value: 'english' },
            { label: 'Math', value: 'math' },
            { label: 'Biology', value: 'biology' },
            { label: 'Physics', value: 'physics' },
            { label: 'Chemistry', value: 'chemistry' },
          ]}
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Subject"
          searchPlaceholder="Search..."
          value={selectedSubject}
          onChange={(item) => setSelectedSubject(item.value)}
          renderLeftIcon={() => (
            <Icon style={styles.icon} name="Safety" size={20} />
          )}
        />

        <Dropdown
          highlightStyle={{
            backgroundColor: 'white', // Background color of dropdown items
            color: 'black', // Text color of dropdown items
          }}
          label="Select Section"
          data={[
            { label: 'Section A', value: 'sectionA' },
            { label: 'Section B', value: 'sectionB' },
            { label: 'Section C', value: 'sectionC' },
            { label: 'Section D', value: 'sectionD' },
          ]}
          style={styles.dropdown}
          placeholder={
            <Text style={{
              fontSize: 12,
              color: 'black',
              textOverflow: 'ellipsis',
              maxWidth: '90%',
            }}>Select Section</Text>
          }
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Search..."
          value={selectedSection}
          onChange={(item) => setSelectedSection(item.value)}
          renderLeftIcon={() => (
            <Icon style={styles.icon} name="Safety" size={20} />
          )}
        />
      </View>

      <FlatList
        data={students}
        renderItem={renderStudent}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContent}
      />

      <TouchableOpacity style={styles.createStudentButton} onPress={toggleModal}>
        <Text style={styles.createStudentButtonText}>Create Student</Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Student ID"
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              placeholder="Class"
            />
             <TextInput
              style={styles.input}
              placeholder="Subject"
            />
             <TextInput
              style={styles.input}
              placeholder="Section"
            />
             
            <Button color={'black'} title="Add Student" onPress={() => {
              const id = Date.now().toString();
              const name = ''; // Replace with the entered name
              const profilePicture = ''; // Replace with the entered picture URL
              const student = { id, name, profilePicture };
              addStudent(student);
              toggleModal();
            }} />
            <Button color={'black'} title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray', // Changed the background color to light gray
  },
  blueBar: {
    height: 50,
    backgroundColor: 'black',
    height:'10%'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  dropdown: {
    width: 115, // adjust the width as needed
    margin: 8, // decrease the margin to make dropdowns smaller
    backgroundColor: 'black',
    borderRadius: 50, // decrease the border radius if desired
    padding: 8, // decrease the padding to make dropdowns smaller
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    marginRight: 0,
    color:'black'
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,

  },
  placeholderStyle: {
    fontSize: 100,
   
  },
  selectedTextStyle: {
    fontSize: 12,
    color:'white'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color:'black'
  },
  highlightedItem: {
    backgroundColor: 'lightgray', // optional
    color: 'black', // change text color to black
  },
  studentGrid: {
    alignItems: 'center',
    margin: 10,
    marginLeft:-1
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  studentName: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color:'black'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',

  },
  flatList: {
    flex: 1,
    marginTop: 20,
  },
  flatListContent: {
    paddingHorizontal: 10, // Adjust the horizontal padding as needed
    paddingBottom: 20, // Adjust the bottom padding as needed
  },
  createStudentButton: {
    backgroundColor: '#ADD8E6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'center',
  },
  createStudentButtonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white', // Changed the background color of the modal content
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color:'black'
  },
  pictureButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  pictureButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Dashboard;