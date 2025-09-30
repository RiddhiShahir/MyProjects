import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [name, setName] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    console.log('Button pressed, starting handleSubmit');
    if (!name.trim()) {
      setResponse('Please enter your name');
      console.log('Validation failed: No name Entered');
      return;
    }
    console.log('Submitting name:', name);

    try {
      const apiResponse = await fetch('http://192.168.1.18:5000/api/Hello', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

    console.log('HTTP status:', apiResponse.status);
    console.log('Response headers:', Object.fromEntries(apiResponse.headers.entries()));

      const data = await apiResponse.json();
      console.log('API Response:', data);

      if (apiResponse.ok && data.response) {
        setResponse(data.response);
      } else {
        setResponse(data.response);
      }
    } catch (error) {
      console.log('Fetch error:', error);
      setResponse('Error connecting to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World App</Text>
      <Text>Enter Your Name</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Your name"
        value={name}
        onChangeText={setName}
      />

      <View style={{ width: '80%', marginVertical: 10 }}>
        <Button color="gray" title="Submit" onPress={handleSubmit} />
      </View>

      {response ? <Text style={styles.output}>{response}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'dodgerblue',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    height: 40,
  },
  output: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    fontWeight: '500',
  },
});
