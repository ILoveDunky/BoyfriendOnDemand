import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function ContentPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tight">Content Management</h1>
        <p className="mt-2 text-muted-foreground">
          Here you can manage all the content that appears in the app.
        </p>
      </header>
      <Tabs defaultValue="soundboard">
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
              <p className="text-sm text-muted-foreground">This section will contain a list of all audio clips and the tools to upload new ones.</p>
            </CardContent>
            <CardFooter>
              <Button>
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
              <p className="text-sm text-muted-foreground">This section will allow you to upload new photos and manage the gallery.</p>
            </CardContent>
            <CardFooter>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Photo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="letters">
          <Card>
            <CardHeader>
              <CardTitle>Love Letters</CardTitle>
              <CardDescription>Manage your written letters.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This section will provide an editor to write new letters and manage existing ones.</p>
            </CardContent>
            <CardFooter>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Write New Letter
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="playlists">
          <Card>
            <CardHeader>
              <CardTitle>Playlists</CardTitle>
              <CardDescription>Manage your curated playlists.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">This section will allow you to add and update links to your playlists.</p>
            </CardContent>
            <CardFooter>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Playlist
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
