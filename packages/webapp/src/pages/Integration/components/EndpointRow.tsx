import { BoltIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@geist-ui/core';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import EndpointLabel from './EndpointLabel';
import { Flow, FlowEndpoint } from '../../../types';
import FlowCard from './FlowCard';

export interface EndpointRowProps {
    flow: Flow;
    openAPIDocModal: (flow: Flow) => void;
    endpoint: string | FlowEndpoint;
    source: 'Public' | 'Managed' | 'Custom';
    output: string;
}

export default function EndpointRow({ flow, openAPIDocModal, endpoint, source, output }: EndpointRowProps) {
    return (
        <td className="flex items-center p-3 justify-between border-b border-border-gray cursor-pointer" onClick={() => openAPIDocModal({ ...flow, endpoint: endpoint as string, output })}>
            <div className="flex items-center px-2 w-48">
                <EndpointLabel endpoint={endpoint} type={flow.type} />
            </div>
            <div className="flex items-center ml-3">
                <Tooltip text={<span className="text-sm">{flow.description}</span>} type="dark">
                    <div className="text-gray-400 w-64 max-w-3xl truncate">{flow.description}</div>
                </Tooltip>
            </div>
            <div className="w-48 ml-3">
                <div className="w-48 text-gray-400">
                    {source}
                </div>
            </div>
            <div className="flex flex-end ml-16 relative group hover:bg-neutral-800 rounded p-2">
                {flow?.type === 'sync' && (
                    <ArrowPathRoundedSquareIcon className="flex h-5 w-5 text-gray-400 cursor-pointer" />
                )}
                {flow?.type === 'action' && (
                    <BoltIcon className="flex h-5 w-5 text-gray-400 cursor-pointer" />
                )}
                <div className="hidden group-hover:block text-white absolute z-10 top-10 -left-24 bg-neutral-800 rounded border border-neutral-700 w-56">
                    <FlowCard flow={flow} />
                </div>
            </div>
        </td>
    );
}