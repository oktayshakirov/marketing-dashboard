import Card from "@/components/Card";
import {
    Avatar,
    ChatContainer,
    Conversation,
    ConversationHeader,
    ConversationList,
    MainContainer,
    Message,
    MessageInput,
    MessageList,
    Sidebar,
    TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import React from "react";

const Chat: React.FC = () => {
    return (
        <Card style={{ height: "85vh" }}>
            <MainContainer responsive>
                <Sidebar position="left" scrollable={true}>
                    <ConversationList>
                        <Conversation
                            name="Vladi"
                            lastSenderName="Vladi"
                            info="How are you today?"
                            active
                            unreadCnt={3}
                        >
                            <Avatar src="/avatars/vladi.png" name="Avatar" status="available" />
                        </Conversation>
                        <Conversation name="Darwin Wiranda" lastSenderName="Darwin" info="Hey there!">
                            <Avatar src="/avatars/darwin.png" name="Avatar" status="away" />
                        </Conversation>
                        <Conversation name="Design" lastSenderName="Vasilis" info="Hello " unreadCnt={2}>
                            <Avatar src="\ogno.svg" name="Avatar" status="invisible" />
                        </Conversation>
                        <Conversation name="Marketing" lastSenderName="Alex" info="Test" unreadCnt={6}>
                            <Avatar src="\ogno.svg" name="Avatar" status="invisible" />
                        </Conversation>
                        <Conversation name="Vasilis K." lastSenderName="Oktay" info="What's up?">
                            <Avatar src="/avatars/vasilis.png" name="Avatar" status="dnd" />
                        </Conversation>
                        <Conversation name="Alex K." lastSenderName="Alex" info="Good morning">
                            <Avatar src="/avatars/alex.png" name="Avatar" status="invisible" />
                        </Conversation>
                        <Conversation name="Sophie" lastSenderName="Sophie" info="Hello">
                            <Avatar src="\ogno.svg" name="Avatar" status="invisible" />
                        </Conversation>
                        <Conversation name="Bayer Team" lastSenderName="Oktay" info="Good morning">
                            <Avatar src="/avatars/bayer.png" name="Avatar" status="available" />
                        </Conversation>
                    </ConversationList>
                </Sidebar>
                <ChatContainer>
                    <ConversationHeader>
                        <Avatar src="\ogno.svg" name="Vladi" />
                        <ConversationHeader.Content userName="Vladi" info="Active now" />
                    </ConversationHeader>
                    <MessageList>
                        <Message
                            model={{
                                message: "Hello!",
                                sentTime: "just now",
                                sender: "Vladi",
                                direction: "incoming",
                                position: "single",
                            }}
                        >
                            <Avatar src="\ogno.svg" name="Avatar" />
                        </Message>
                        <Message
                            model={{
                                message: "How are you?",
                                sentTime: "a few seconds ago",
                                sender: "Vladi",
                                direction: "outgoing",
                                position: "single",
                            }}
                        >
                            <Avatar src="\ogno.svg" name="Avatar" />
                        </Message>

                        <Message
                            model={{
                                message: "test",
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: "incoming",
                                position: "first",
                            }}
                            avatarSpacer
                        />
                        <Message
                            model={{
                                message: "test",
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: "incoming",
                                position: "normal",
                            }}
                            avatarSpacer
                        />
                        <Message
                            model={{
                                message: "test",
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: "incoming",
                                position: "normal",
                            }}
                            avatarSpacer
                        />
                        <Message
                            model={{
                                message: "test",
                                sentTime: "15 mins ago",
                                sender: "Zoe",
                                direction: "incoming",
                                position: "last",
                            }}
                        >
                            <Avatar src="\ogno.svg" name="Avatar" />
                        </Message>

                        <TypingIndicator content="Vladi is typing" />
                    </MessageList>
                    <MessageInput placeholder="Type message here" />
                </ChatContainer>
            </MainContainer>
        </Card>
    );
};

export default Chat;
