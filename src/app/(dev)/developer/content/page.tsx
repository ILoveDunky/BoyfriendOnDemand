
'use client'

import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, Edit, Save, X } from "lucide-react"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useContent } from '@/context/content-context'
import { Letter, Playlist, SoundboardCategory, AudioClip, ImagePlaceholder } from '@/lib/data'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function LettersManager() {
  const { letters, setLetters } = useContent();
  const [isCreating, setIsCreating] = useState(false)
  const [newLetter, setNewLetter] = useState({ title: '', content: '' })
  const [editingLetter, setEditingLetter] = useState<Letter | null>(null)

  const handleCreate = () => {
    if (newLetter.title && newLetter.content) {
      setLetters([
        ...letters,
        {
          id: `letter${Date.now()}`,
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
                      placeholder="Letter Title"
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
                      placeholder="Letter Content"
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button size="sm" variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete this letter.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(letter.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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

function PlaylistsManager() {
    const { playlists, setPlaylists } = useContent();
    const [isCreating, setIsCreating] = useState(false);
    const [newPlaylistEmbed, setNewPlaylistEmbed] = useState('');
    const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);

    const extractSrc = (iframe: string) => {
        const match = iframe.match(/src="([^"]*)"/);
        return match ? match[1] : '';
    }

    const extractTitleAndDesc = (embedSrc: string): { title: string, description: string } => {
        try {
            const url = new URL(embedSrc);
            const path = url.pathname;
            if (path.includes('/embed/playlist/')) {
                return { title: 'Spotify Playlist', description: 'Listen on Spotify.' };
            }
        } catch (e) {
            // Not a valid URL
        }
        return { title: 'New Playlist', description: 'A collection of songs.' };
    }


    const handleCreate = () => {
        const embedSrc = extractSrc(newPlaylistEmbed);
        if (embedSrc) {
            const { title, description } = extractTitleAndDesc(embedSrc);
            setPlaylists([...playlists, { id: `pl${Date.now()}`, title, description, embedSrc }]);
            setNewPlaylistEmbed('');
            setIsCreating(false);
        }
    };

    const handleDelete = (id: string) => {
        setPlaylists(playlists.filter((p) => p.id !== id));
    };

    const handleEdit = (playlist: Playlist) => {
        setEditingPlaylist({ ...playlist, embedSrc: `<iframe src="${playlist.embedSrc}"></iframe>` }); // Reconstruct for editing
    };

    const handleSave = () => {
        if (editingPlaylist) {
            const newEmbedSrc = extractSrc(editingPlaylist.embedSrc);
            if(newEmbedSrc) {
                 const { title, description } = extractTitleAndDesc(newEmbedSrc);
                 setPlaylists(playlists.map((p) => (p.id === editingPlaylist.id ? { ...editingPlaylist, embedSrc: newEmbedSrc, title, description } : p)));
                 setEditingPlaylist(null);
            }
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Playlists</CardTitle>
                <CardDescription>Manage your Spotify playlists. Paste the full embed code from Spotify.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {playlists.map((playlist) => (
                        <Card key={playlist.id} className="bg-muted/30">
                            <CardContent className="p-4 space-y-2">
                                {editingPlaylist?.id === playlist.id ? (
                                    <div className="space-y-2">
                                        <Textarea value={editingPlaylist.embedSrc} onChange={(e) => setEditingPlaylist({ ...editingPlaylist, embedSrc: e.target.value })} rows={4} placeholder='<iframe src="..."/>'/>
                                    </div>
                                ) : (
                                    <div>
                                        <iframe 
                                            style={{ borderRadius: '12px' }} 
                                            src={playlist.embedSrc}
                                            width="100%" 
                                            height="152" 
                                            frameBorder="0" 
                                            allowFullScreen={false}
                                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                                            loading="lazy"
                                        ></iframe>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 pt-2">
                                    {editingPlaylist?.id === playlist.id ? (
                                        <>
                                            <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                            <Button size="sm" variant="ghost" onClick={() => setEditingPlaylist(null)}><X className="mr-2 h-4 w-4" /> Cancel</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(playlist)}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                  <Button size="sm" variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this playlist.</AlertDialogDescription></AlertDialogHeader>
                                                    <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(playlist.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                {isCreating && (
                    <div className="space-y-4 rounded-lg border p-4">
                        <h3 className="font-medium">New Playlist</h3>
                        <Textarea placeholder="Paste Spotify embed code here..." value={newPlaylistEmbed} onChange={(e) => setNewPlaylistEmbed(e.target.value)} rows={4} />
                        <div className="flex gap-2">
                            <Button onClick={handleCreate}><Save className="mr-2 h-4 w-4" /> Save Playlist</Button>
                            <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter>
                {!isCreating && <Button onClick={() => setIsCreating(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New Playlist</Button>}
            </CardFooter>
        </Card>
    );
}

function GalleryManager() {
    const { images, setImages } = useContent();
    const [isCreating, setIsCreating] = useState(false);
    const [newImage, setNewImage] = useState<Omit<ImagePlaceholder, 'id'>>({ description: '', imageUrl: '', imageHint: '' });
    const [editingImage, setEditingImage] = useState<ImagePlaceholder | null>(null);

     const handleCreate = () => {
        if (newImage.description && newImage.imageUrl) {
            setImages([...images, { id: `img${Date.now()}`, ...newImage }]);
            setNewImage({ description: '', imageUrl: '', imageHint: '' });
            setIsCreating(false);
        }
    };

    const handleDelete = (id: string) => {
        setImages(images.filter((img) => img.id !== id));
    };

    const handleEdit = (image: ImagePlaceholder) => {
        setEditingImage({ ...image });
    };

    const handleSave = () => {
        if (editingImage) {
            setImages(images.map((img) => (img.id === editingImage.id ? editingImage : img)));
            setEditingImage(null);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
                <CardDescription>Manage your photos. Use direct image URLs.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                     <Card key={image.id} className="bg-muted/30 overflow-hidden">
                         <img src={image.imageUrl} alt={image.description} className="w-full h-48 object-cover" />
                         <CardContent className="p-4 space-y-2">
                             {editingImage?.id === image.id ? (
                                <div className="space-y-2">
                                     <Input placeholder="Description" value={editingImage.description} onChange={(e) => setEditingImage({ ...editingImage, description: e.target.value })} />
                                     <Input placeholder="Image URL" value={editingImage.imageUrl} onChange={(e) => setEditingImage({ ...editingImage, imageUrl: e.target.value })} />
                                     <Input value={editingImage.imageHint} placeholder="AI Hint (e.g. happy selfie)" onChange={(e) => setEditingImage({ ...editingImage, imageHint: e.target.value })} />
                                 </div>
                             ) : (
                                 <div>
                                     <p className="font-semibold">{image.description}</p>
                                 </div>
                             )}
                             <div className="flex items-center gap-2 pt-2">
                                 {editingImage?.id === image.id ? (
                                    <>
                                        <Button size="sm" onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save</Button>
                                        <Button size="sm" variant="ghost" onClick={() => setEditingImage(null)}><X className="mr-2 h-4 w-4" /> Cancel</Button>
                                    </>
                                 ) : (
                                    <>
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(image)}><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button size="sm" variant="destructive"><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this photo.</AlertDialogDescription></AlertDialogHeader>
                                                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(image.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </>
                                 )}
                             </div>
                         </CardContent>
                     </Card>
                ))}

                 {isCreating && (
                    <Card className="bg-muted/30">
                        <CardContent className="p-4 space-y-4">
                            <h3 className="font-medium">New Photo</h3>
                            <Input placeholder="Image URL" value={newImage.imageUrl} onChange={(e) => setNewImage({ ...newImage, imageUrl: e.target.value })} />
                            <Input placeholder="Description" value={newImage.description} onChange={(e) => setNewImage({ ...newImage, description: e.target.value })} />
                            <Input placeholder="AI Hint (e.g. happy selfie)" value={newImage.imageHint} onChange={(e) => setNewImage({ ...newImage, imageHint: e.target.value })} />
                            <div className="flex gap-2">
                                <Button onClick={handleCreate}><Save className="mr-2 h-4 w-4" /> Save Photo</Button>
                                <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
            <CardFooter>
                 {!isCreating && <Button onClick={() => setIsCreating(true)}><PlusCircle className="mr-2 h-4 w-4" /> Add New Photo</Button>}
            </CardFooter>
        </Card>
    );
}

function SoundboardManager() {
    const { soundboardCategories, setSoundboardCategories } = useContent();

    const handleClipChange = (catId: string, clipId: string, field: keyof AudioClip, value: string) => {
        const updatedCategories = soundboardCategories.map(cat => {
            if (cat.id === catId) {
                return {
                    ...cat,
                    clips: cat.clips.map(clip => 
                        clip.id === clipId ? { ...clip, [field]: value } : clip
                    )
                };
            }
            return cat;
        });
        setSoundboardCategories(updatedCategories);
    };

    const handleAddClip = (catId: string) => {
        const newClip: AudioClip = {
            id: `clip${Date.now()}`,
            title: 'New Clip Title',
            audioSrc: ''
        };
        const updatedCategories = soundboardCategories.map(cat => {
            if (cat.id === catId) {
                return { ...cat, clips: [...cat.clips, newClip] };
            }
            return cat;
        });
        setSoundboardCategories(updatedCategories);
    };

    const handleDeleteClip = (catId: string, clipId: string) => {
        const updatedCategories = soundboardCategories.map(cat => {
            if (cat.id === catId) {
                return { ...cat, clips: cat.clips.filter(clip => clip.id !== clipId) };
            }
            return cat;
        });
        setSoundboardCategories(updatedCategories);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Soundboard Clips</CardTitle>
                <CardDescription>Manage your audio messages. Paste direct audio URLs (e.g., from SoundCloud or Pixabay).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {soundboardCategories.map(category => (
                    <Card key={category.id} className="bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2"><category.icon /> {category.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {category.clips.map(clip => (
                                <div key={clip.id} className="flex items-center gap-2">
                                    <Input 
                                        value={clip.title}
                                        onChange={e => handleClipChange(category.id, clip.id, 'title', e.target.value)}
                                        className="flex-grow"
                                        placeholder="Clip Title"
                                    />
                                    <Input
                                        value={clip.audioSrc}
                                        onChange={e => handleClipChange(category.id, clip.id, 'audioSrc', e.target.value)}
                                        className="flex-grow"
                                        placeholder="Audio URL (e.g., .mp3)"
                                    />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" variant="destructive"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete this clip.</AlertDialogDescription></AlertDialogHeader>
                                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDeleteClip(category.id, clip.id)}>Delete</AlertDialogAction></AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ))}
                            <Button variant="outline" size="sm" onClick={() => handleAddClip(category.id)}>
                                <PlusCircle className="mr-2 h-4 w-4" /> Add Clip to {category.name}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}

export default function ContentPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Content Management</h1>
        <p className="mt-2 text-muted-foreground">
          Here you can manage all the content that appears in the app. All changes are saved automatically.
        </p>
      </header>
      <Tabs defaultValue="playlists">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="playlists">Playlists</TabsTrigger>
          <TabsTrigger value="letters">Letters</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="soundboard">Soundboard</TabsTrigger>
        </TabsList>
        <TabsContent value="playlists">
          <PlaylistsManager />
        </TabsContent>
        <TabsContent value="letters">
          <LettersManager />
        </TabsContent>
        <TabsContent value="gallery">
          <GalleryManager />
        </TabsContent>
        <TabsContent value="soundboard">
          <SoundboardManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}
