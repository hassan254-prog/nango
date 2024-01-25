import Button from '../../../components/ui/button/Button';
import { PhoneIcon, BookOpenIcon } from '@heroicons/react/24/outline';

export default function HelpFooter({ type = 'Scripts' }: { type?: string }) {
    return (
        <div className="my-10 space-x-3">
            <a href="https://docs.nango.dev/guides/custom" target="_blank" rel="noreferrer">
                <Button variant="zinc">
                    <BookOpenIcon className="flex h-5 w-5 cursor-pointer hover:text-zinc-400" onClick={() => true} />
                    <span>Create Your Own {type}</span>
                </Button>
            </a>
            <a href="https://www.nango.dev/chat" target="_blank" rel="noreferrer">
                <Button variant="zinc">
                    <PhoneIcon className="flex h-5 w-5 cursor-pointer hover:text-zinc-400" onClick={() => true} />
                    <span>Request From Nango</span>
                </Button>
            </a>
        </div>
    );
}
