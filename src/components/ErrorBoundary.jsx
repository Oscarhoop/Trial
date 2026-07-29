import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error('[ErrorBoundary]', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#0b0b0b',
                        color: 'white',
                        textAlign: 'center',
                        padding: '2rem',
                        fontFamily: 'Inter, sans-serif',
                    }}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💔</div>
                    <h2
                        style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '1.8rem',
                            marginBottom: '0.75rem',
                            color: 'rgba(255,255,255,0.9)',
                        }}
                    >
                        Something went wrong
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '360px', lineHeight: 1.6 }}>
                        An unexpected error occurred. Please refresh the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '2rem',
                            padding: '0.75rem 2rem',
                            background: 'linear-gradient(135deg, #d4af37, #b8941e)',
                            color: '#0b0b0b',
                            border: 'none',
                            borderRadius: '9999px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
