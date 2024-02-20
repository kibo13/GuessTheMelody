import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CommandsList from '../components/CommandsList';
import SongTable from '../components/SongTable';

function Home() {
    return (
        <div>
            <Container fluid>
                <Row>
                    <Col xs={9} style={{ padding: '10px' }}>
                        <SongTable />
                    </Col>
                    <Col xs={3} style={{ padding: '10px' }}>
                        <CommandsList />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
