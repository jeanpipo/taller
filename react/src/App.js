import React, { useState } from 'react';

function Home({ name }) {
    return (
        <div>
            Holaaa {name}
        </div>
    );
}

function App() {
    return (
        <div className="">
            <h1>welcome</h1>
            <Home name="jean sosa"  />
        </div>
    );
}

export default App;