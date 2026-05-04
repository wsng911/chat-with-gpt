import styled from "@emotion/styled";
import { Button, Modal, 密码Input, TextInput } from "@mantine/core";
import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useAppDispatch, useAppSelector } from "../store";
import { closeModals, openLoginModal, openSignupModal, selectModal } from "../store/ui";

const Container = styled.form`
    * {
        font-family: "Work Sans", sans-serif;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .mantine-TextInput-root, .mantine-密码Input-root {
        margin-top: 1rem;
    }
    
    .mantine-TextInput-root + .mantine-Button-root,
    .mantine-密码Input-root + .mantine-Button-root {
        margin-top: 1.618rem;
    }

    .mantine-Button-root {
        margin-top: 1rem;
    }

    label {
        margin-bottom: 0.25rem;
    }
`;

export function LoginModal(props: any) {
    const modal = useAppSelector(selectModal);
    const dispatch = useAppDispatch();
    const intl = useIntl();

    const on关闭 = useCallback(() => dispatch(closeModals()), [dispatch]);
    const on创建AccountClick = useCallback(() => dispatch(openSignupModal()), [dispatch]);

    return <Modal opened={modal === 'login'} on关闭={on关闭} with关闭Button={false}>
        <Container action="/chatapi/login" method="post">
            <h2>
                <FormattedMessage defaultMessage={"登录"} />
            </h2>
            <input type="hidden" name="redirect_url" value={window.location.href} />
            <TextInput
                label={intl.formatMessage({ defaultMessage: "邮箱 address" })}
                name="username"
                placeholder={intl.formatMessage({ defaultMessage: "Enter your email address" })}
                type="email"
                required />
            <密码Input
                label={intl.formatMessage({ defaultMessage: "密码" })}
                name="password"
                placeholder={intl.formatMessage({ defaultMessage: "Enter your password" })}
                maxLength={500}
                required />
            <Button fullWidth type="submit">
                <FormattedMessage defaultMessage={"登录"} />
            </Button>
            <Button fullWidth variant="subtle" onClick={on创建AccountClick}>
                <FormattedMessage defaultMessage={"Or create an account"} description="Label for a button on the 登录 page that lets the user create an account instead" />
            </Button>
        </Container>
    </Modal>
}

export function 创建AccountModal(props: any) {
    const modal = useAppSelector(selectModal);
    const dispatch = useAppDispatch();
    const intl = useIntl();

    const on关闭 = useCallback(() => dispatch(closeModals()), [dispatch]);
    const onSignInClick = useCallback(() => dispatch(openLoginModal()), [dispatch]);

    return <Modal opened={modal === 'signup'} on关闭={on关闭} with关闭Button={false}>
        <Container action="/chatapi/register" method="post">
            <h2>
                <FormattedMessage defaultMessage={"创建 an account"} />
            </h2>
            <input type="hidden" name="redirect_url" value={window.location.href} />
            <TextInput
                label={intl.formatMessage({ defaultMessage: "邮箱 address" })}
                name="username"
                placeholder={intl.formatMessage({ defaultMessage: "Enter your email address" })}
                type="email"
                required />
            <密码Input
                label={intl.formatMessage({ defaultMessage: "密码" })}
                name="password"
                placeholder={intl.formatMessage({ defaultMessage: "Enter your password" })}
                minLength={6}
                maxLength={500}
                required />
            <Button fullWidth type="submit">
                <FormattedMessage defaultMessage={"注册"} />
            </Button>
            <Button fullWidth variant="subtle" onClick={onSignInClick}>
                <FormattedMessage defaultMessage={"Or sign in to an existing account"} description="Label for a button on the 创建 Account page that lets the user sign into their existing account instead" />
            </Button>
        </Container>
    </Modal>
}