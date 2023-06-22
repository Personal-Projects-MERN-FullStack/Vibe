import { useEffect } from 'react'
import { pd } from '../store/Product-handler';
import { useDispatch } from 'react-redux';

export const useGetproducts = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        // Establish WebSocket connection
        const socket = new WebSocket("ws://localhost:5000");
      
        // WebSocket connection event
        socket.onopen = () => {
          console.log("WebSocket connection established.");
        };
      
        // Handle incoming WebSocket messages
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch(pd.setproducts(data));
          // Process the received data as needed
        };
      
        // Handle WebSocket errors
        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      
        // Handle WebSocket close event if needed
        socket.onclose = () => {
          console.log("WebSocket connection closed.");
        };
      
        // Clean up the WebSocket connection on component unmount
        return () => {
          socket.close();
        };
      }, []);
}
