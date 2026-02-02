import { useState } from 'react';
import ValentinePage from './pages/ValentinePage';
import SuccessPage from './pages/SuccessPage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [accepted, setAccepted] = useState(false);

  return (
    <>
      {!accepted ? (
        <ValentinePage onAccept={() => setAccepted(true)} />
      ) : (
        <SuccessPage onReset={() => setAccepted(false)} />
      )}
      <Toaster />
    </>
  );
}

export default App;
