import {Box, Typography } from '@mui/material';
import AliasCard from '@/components/aliasCard';
import { Alias } from '@/utils/aliasService';

interface AliasListProps {
    title: string;
    list?: Alias[];
}

const AliasList: React.FC<AliasListProps> = ({title, list = []}) => {
    return (
        <Box p={4} sx={{ maxWidth: '800px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                {title}
            </Typography>
            {list.length === 0 ? 
                <Typography>No aliases found</Typography>
             : 
                <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 2
                    }}>
                    {list.map((alias, _) => (
                        <AliasCard key={alias.alias} url={alias.url} alias={alias.alias} />
                    ))}
                </Box>
            }
        </Box>
    );
};

export default AliasList;