import { useCallback, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./core/context";

export function useChatSpotlightProps() {
    const navigate = useNavigate();
    const { chat } = useAppContext();
    const intl = useIntl();

    const [version, setVersion] = useState(0);

    useEffect(() => {
        const handle更新 = () => setVersion(v => v + 1);
        chat.on('update', handle更新);
        return () => {
            chat.off('update', handle更新);
        };
    }, [chat]);

    const search = useCallback((query) => {
        return chat.searchChats(query)
            .map((result) => ({
                ...result,
                onTrigger: () => navigate(`/chat/${result.chatID}${result.messageID ? `#msg-${result.messageID}` : ''}`),
            }))
    }, [chat, navigate, version]);

    const props = useMemo(() => ({
        shortcut: ['/'],
        overlayColor: '#000000',
        searchPlaceholder: intl.formatMessage({ defaultMessage: '搜索 your chats' }),
        searchIcon: <i class名称="fa fa-search" />,
        actions: search,
        filter: (query, items) => items,
    }), [search]);

    return props;
}