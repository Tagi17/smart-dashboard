'use client'

import React, { useEffect, useState } from 'react';

import { FiEdit } from 'react-icons/fi';
import { Input } from "@/components/ui/input";

const EditName = () => {
    const [name, setName] = useState('');
    const [isEditing, setIsEditing] = useState(false);
  
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        localStorage.setItem('userName', name);
    }, [name]);

    useEffect(() => {
        const savedName = localStorage.getItem('userName');
        if (savedName) {
            setName(savedName);
        }
    }, []);
    
  return (
    <div className="flex items-center space-x-2">
    {isEditing ? (
      <Input
        type="text"
        value={name}
        onChange={handleNameChange}
        onBlur={toggleEdit}
        autoFocus
        className="w-2/5 text-2xl"
      />
    ) : (
      <>
        <div className="text-2xl text-bold">{name || 'Add a name'}</div>
        <button onClick={toggleEdit} className="text-lg">
          <FiEdit />
        </button>
      </>
    )}
  </div>
  )
}

export default EditName;