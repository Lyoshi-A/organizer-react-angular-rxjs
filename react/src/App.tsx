import React from 'react';
import {Selector} from './components/selector';
import {Calendar} from './components/calendar';
import {Organizer} from './components/organizer';
import OrganizerProvider from './components/shared/OrganizerProvider';
import './App.scss';

const App: React.FC = () => (
  <OrganizerProvider>
      <div className="container">
          <header>
              <Selector />
          </header>
          <main>
              <Calendar />
          </main>
          <div>
              <Organizer />
          </div>
      </div>
  </OrganizerProvider>
)

export default App;
