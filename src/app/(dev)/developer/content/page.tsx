
'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Edit, Save, X } from "lucide-react"
import { letters as initialLetters, Letter } from '@/lib/data'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

function LettersManager() {
  const [letters, setLetters] = useState<Letter[]>(initialLetters)
  const [isCreating, setIsCreating] = useState(false)
  const [newLetter, setNewLetter] = useState({ title: '', content: '' })
  const [editingLetter, setEditingLetter] = useState<Letter | null>(null)

  const handleCreate = () => {
    if (newLetter.title && newLetter.content) {
      setLetters([
        ...letters,
        {
          id: `letter${letters.length + 1}`,
          title: newLetter.title,
          content: newLetter.content,
          date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      ])
      setNewLetter({ title: '', content: '' })
      setIsCreating(false)
    }
  }

  const handleDelete = (id: string) => {
    setLetters(letters.filter((letter) => letter.id !== id))
  }

  const handleEdit = (letter: Letter) => {
    setEditingLetter({ ...letter })
  }

  const handleSave = () => {
    if (editingLetter) {
      setLetters(
        letters.map((l) => (l.id === editingLetter.id ? editingLetter : l))
      )
      setEditingLetter(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Love Letters</CardTitle>
        <CardDescription>Manage your written letters.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {letters.map((letter) => (
            <Card key={letter.id} className="bg-muted/30">
              <CardContent className="p-4 space-y-2">
                {editingLetter?.id === letter.id ? (
                  <div className="space-y-2">
                    <Input
                      value={editingLetter.title}
                      onChange={(e) =>
                        setEditingLetter({
                          ...editingLetter,
                          title: e.target.value,
                        })
                      }
                      className="text-lg font-bold"
                    />
                    <Textarea
                      value={editingLetter.content}
                      onChange={(e) =>
                        setEditingLetter({
                          ...editingLetter,
                          content: e.target.value,
                        })
                      }
                      rows={4}
                    />
                  </div>
                ) : (
                  <div>
                    <h3 className="font-bold text-lg">{letter.title}</h3>
                    <p className="text-sm text-muted-foreground">{letter.date}</p>
                    <p className="mt-2 text-sm whitespace-pre-line">
                      {letter.content}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2 pt-2">
                  {editingLetter?.id === letter.id ? (
                    <>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingLetter(null)}
                      >
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(letter)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(letter.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {isCreating && (
          <div className="space-y-4 rounded-lg border p-4">
            <h3 className="font-medium">New Letter</h3>
            <Input
              placeholder="Letter Title"
              value={newLetter.title}
              onChange={(e) =>
                setNewLetter({ ...newLetter, title: e.target.value })
              }
            />
            <Textarea
              placeholder="Letter content..."
              value={newLetter.content}
              onChange={(e) =>
                setNewLetter({ ...newLetter, content: e.target.value })
              }
              rows={5}
            />
            <div className="flex gap-2">
              <Button onClick={handleCreate}>
                <Save className="mr-2 h-4 w-4" /> Save Letter
              </Button>
              <Button variant="ghost" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> Write New Letter
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default function ContentPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Content Management</h1>
        <p className="mt-2 text-muted-foreground">
          Here you can manage all the content that appears in the app.
        </p>
      </header>
      <Tabs defaultValue="letters">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="soundboard">Soundboard</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="letters">Letters</TabsTrigger>
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
        </TabsList>
        <TabsContent value="soundboard">
          <Card>
            <CardHeader>
              <CardTitle>Soundboard Clips</CardTitle>
              <CardDescription>Manage your audio messages.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This section is under construction. Functionality to manage soundboard clips will be added soon.</p>
            </CardContent>
             <CardFooter>
              <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Clip
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Photo Gallery</CardTitle>
              <CardDescription>Manage your selfies and photos.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This section is under construction. Functionality to manage the photo gallery will be added soon.</p>
            </CardContent>
            <CardFooter>
              <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Photo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="letters">
          <LettersManager />
        </TabsContent>
        <TabsContent value="playlists">
          <Card>
            <CardHeader>
              <CardTitle>Playlists</CardTitle>
              <CardDescription>Manage your curated playlists.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This section is under construction. Functionality to manage playlists will be added soon.</p>
            </CardContent>
            <CardFooter>
              <Button disabled>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Playlist
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
