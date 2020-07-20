import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Editor, Editable, Settings, ImageField } from 'haiku-light-editor';
import 'haiku-light-editor/dist/index.css';

const settings: Settings = {
  width: 300,
  height: 200
};

const editable: Editable = {
  width: 20, // width in units, e.g mm
  height: 20 // width in units, e.g. mm
};

const imageField: ImageField = {
  type: 'image',
  id: '1',
  x: 5, // position x in units
  y: 5, // position y in units
  width: 10, // field width in units, e.g. mm
  height: 10, // field heights in units, e.g. mm
  angle: 0, // angle in radians
  scale: 0.05, // image scale
  cx: 0, // content shift in units
  cy: 0, // content shifts in units
  imageWidth: 200, // image width in px
  imageHeight: 200, // image height in px
  imageUrl: '/wolf.png',
  imageFlip: false,
  imageRotation: 0 // image rotation
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/black'>
          <Editor
            settings={{
              ...settings,
              backgroundColor: '#000000'
            }}
            editable={editable}
          />
        </Route>
        <Route path='/simple'>
          <Editor settings={settings} editable={editable} />
        </Route>
        <Route path='/image'>
          <Editor
            settings={settings}
            editable={{ ...editable, fields: [imageField] }}
          />
        </Route>
        <Route
          path='/exifl:id'
          render={({ match }) => {
            return (
              <Editor
                settings={settings}
                editable={{
                  ...editable,
                  fields: [
                    {
                      ...imageField,
                      imageWidth: 1800,
                      imageHeight: 1200,
                      x: 1,
                      y: 4,
                      width: 18,
                      height: 12,
                      scale: 0.01,
                      imageUrl: `/exif/Landscape_${match.params.id}.jpg`
                    }
                  ]
                }}
              />
            );
          }}
        ></Route>
        <Route
          path='/exifp:id'
          render={({ match }) => {
            return (
              <Editor
                settings={settings}
                editable={{
                  ...editable,
                  fields: [
                    {
                      ...imageField,
                      imageWidth: 1200,
                      imageHeight: 1800,
                      x: 4,
                      y: 1,
                      width: 12,
                      height: 18,
                      scale: 0.01,
                      imageUrl: `/exif/Portrait_${match.params.id}.jpg`
                    }
                  ]
                }}
              />
            );
          }}
        ></Route>
        <Route
          path='/imagerf:rot:flip'
          render={({ match }) => {
            return (
              <Editor
                settings={settings}
                editable={{
                  ...editable,
                  fields: [
                    {
                      ...imageField,
                      imageRotation: parseInt(match.params.rot, 10),
                      imageFlip: match.params.flip === '1'
                    }
                  ]
                }}
              />
            );
          }}
        ></Route>
        <Route
          path='/imageangle:ang'
          render={({ match }) => {
            return (
              <Editor
                settings={settings}
                editable={{
                  ...editable,
                  fields: [
                    {
                      ...imageField,
                      angle: (parseInt(match.params.ang, 10) / 180) * Math.PI
                    }
                  ]
                }}
              />
            );
          }}
        ></Route>
        <Route path='/'></Route>
      </Switch>
    </Router>
  );
};

export default App;
