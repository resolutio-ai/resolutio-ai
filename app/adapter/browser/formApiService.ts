export const submitEvidence = async (formData: FormData) => {
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
  