import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Button } from './ui/button';
import { ChevronDown, FileText, GraduationCap, LayoutDashboard, PenBox, StarsIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { checkUser } from '@/lib/checkUser';

const Header = async () => {
    await checkUser();

    return (
        <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
                <Link href='/'>
                    <Image src="/logo.png" height={60} width={200} alt='sesnai logo'
                        className='h-12 py-1 w-auto object-contain'
                    />
                </Link>
                <div className='flex items-center gap-2'>
                    <SignedIn>
                        <Link href='/dashboard'>
                            <Button variant="outline">
                                <LayoutDashboard className='h-4 w-4' />
                                <span className='hidden md:block'>
                                    Industry Insights

                                </span>
                            </Button>
                        </Link>


                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <StarsIcon className='h-4 w-4' />
                                    <span className='hidden md:block'>
                                        Growth tools

                                    </span>
                                    <ChevronDown className='ml-2 h-4 w-4' />
                                </Button>

                            </DropdownMenuTrigger>
                            <DropdownMenuContent>

                                <DropdownMenuItem>
                                    <Link href={"/resume"} className='flex items-center gap-2'>
                                        <FileText className='h-4 w-4' />
                                        <span>Build Resyme </span>

                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/ai-cover-letter"} className='flex items-center gap-2'>
                                        <PenBox className='h-4 w-4' />
                                        <span>Cover letter</span>

                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={"/interview"} className='flex items-center gap-2'>
                                        <GraduationCap className='h-4 w-4' />
                                        <span>Interview prep </span>

                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedIn>


                    <SignedOut>
                        <SignInButton>
                            <Button variant="outline">Sign In</Button>

                        </SignInButton>

                    </SignedOut>


                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'h-12 w-10',
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold",

                                },
                            }}
                            afterSignOutUrl="/"

                        />
                    </SignedIn>
                </div>
            </nav>



        </header>

    )
}

export default Header
