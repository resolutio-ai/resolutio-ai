import axios from "axios";

export const submitEvidence = async (formData: string) => {
    try {
      const response = await fetch('https://resolutio-chatbot.onrender.com/api/v1.0/evidence', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit evidence');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error submitting evidence:', error);
      throw error;
    }
  };

export const submitEvidenceLocal = async (formData: any) => {
    try {
      return {status: 200}
      //return await axios.post('http://localhost:6283/api/v1.0/evidence', formData);
      
    } catch (error) {
      //.error('Error submitting evidence:', error);
      
    }
};
  