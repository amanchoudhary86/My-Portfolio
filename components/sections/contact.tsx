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
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget; 
        setIsSubmitting(true);
        setResult(""); 

        const formData = new FormData(form);
        
        formData.append("access_key", "6e7af3fc-c006-4275-871b-97cabbebb229");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            setIsSubmitting(false);

            if (data.success) {
                setResult("Form Submitted Successfully");
                form.reset(); 
                
                setTimeout(() => {
                    setResult("");
                }, 5000);
            } else {
                console.log("Error", data);
                setResult(data.message);
            }
        } catch (error) {
            console.error("Submission error", error);
            setIsSubmitting(false);
            setResult("Something went wrong. Please try again.");
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
                <div className="flex items-center justify-center gap-4">
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
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Your Email"
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary"
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="space-y-2">
                                <Textarea
                                    name="message"
                                    placeholder="Your Message"
                                    required
                                    className="bg-background/50 border-primary/30 focus:border-primary min-h-[150px]"
                                    disabled={isSubmitting}
                                />
                            </div>


                            <Button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                                        Transmitting...
                                    </div>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" /> Send Transmission
                                    </>
                                )}
                            </Button>

                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className={`text-center text-sm font-medium mt-4 ${result.includes("Success") ? "text-primary" : "text-red-400"}`}
                                >
                                    {result}
                                </motion.div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </section>
    )
}
