"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Send } from "lucide-react"

export function Contact() {
    const [result, setResult] = useState<string>("")

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.currentTarget);

        // IMPORTANT: Replace this access key with your own from web3forms.com
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.currentTarget.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="space-y-8"
            >
                <div className="flex items-center gap-4">
                    <Mail className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Establish Connection</h2>
                </div>

                <Card className="max-w-xl mx-auto border-primary/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                        <CardTitle className="text-center text-primary">Send a Message</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary"
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary min-h-[150px]"
                                />
                            </div>

                            <div className="text-xs text-muted-foreground text-center">
                                Note: You need to replace 'YOUR_ACCESS_KEY_HERE' in the code with your actual Web3Forms Access Key.
                            </div>

                            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                <Send className="mr-2 h-4 w-4" /> Send Transmission
                            </Button>

                            {result && (
                                <div className="text-center text-sm font-medium text-primary mt-4">
                                    {result}
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}
